import React, { useState, useEffect } from 'react';
import { getCustomers, createCustomer, updateCustomer, deleteCustomer } from '../../api/customers'
import './Customers.css';



const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [firstName,handleFirstNameChange] =useState('')

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (isEditing) {
        await updateCustomer({ ...formData, id: selectedCustomer.id });
      } else {
        await createCustomer(formData);
      }
      fetchCustomers();
      resetForm();
    } catch (error) {
      console.error('Error submitting customer:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCustomer(id);
      fetchCustomers();
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setSelectedCustomer(null);
    setFormData({ name: '', email: '', phone: '' });
  };

  const handleEdit = (customer) => {
    setIsEditing(true);
    setSelectedCustomer(customer);
    setFormData({ name: customer.name, email: customer.email, phone: customer.phone });
  };



  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const Modal = ({ onClose, children }) => (
    <div className="modal fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="modal-content bg-white rounded p-4 max-w-lg mx-auto my-auto">
        <button onClick={onClose} className="close-modal float-right mb-4">
          &times;
        </button>
        {children}
      </div>
    </div>
  );

  return (
    <div className="customers">
      <h2 className="customers__title">Customers</h2>


      <button className="customers__add" onClick={openModal}>
        Add Tenant
      </button>



      <table className="customers__table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>
                <button className="customers__action" onClick={() => handleEdit(customer)}>
                  Edit
                </button>
                <button
                className="customers__action customers__action--delete" onClick={() => handleDelete(customer.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>




      {showModal && (
        <Modal onClose={closeModal}>
          <form className="customers__form" onSubmit={handleSubmit}>
            
          <div class="w-full px-3 sm:w-1/2">
                <div class="mb-5">
                  <label
                    for="fName"
                    class="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="First Name"
                    value={firstName}
                    onChange={handleFirstNameChange}
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>

            <button className="customers__button" type="submit">
              {isEditing ? 'Update' : 'Add'}
            </button>
            {isEditing && (
              <button
                className="customers__button customers__button--cancel"
                type="button"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}
          </form>

          </Modal>
      )}
  </div>
);
};

export default Customers;
