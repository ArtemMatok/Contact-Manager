
import{ Toaster } from "react-hot-toast";

import { useContacts } from "../hooks/useContacts";

const DataTable = () => {
  const {
    contacts,
    handleFilterChange,
    sortData,
    deleteContact,
    handleEditClick,
    handleInputChange,
    handleSaveClick,
    filter,
    editRowId,
    editedContact,
    setEditRowId,
    setEditedContact
  } = useContacts();

  return (
    <>
      <input
        type="text"
        placeholder="Filter by name"
        value={filter}
        onChange={handleFilterChange}
        className="border px-2 py-1 mb-2"
      />
      {contacts ? (
        <div className="container mx-auto mt-10">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr>
                <th className="cursor-pointer" onClick={() => sortData("name")}>
                  Name
                </th>
                <th
                  className="cursor-pointer"
                  onClick={() => sortData("dateOfBirth")}
                >
                  Date of Birth
                </th>
                <th
                  className="cursor-pointer"
                  onClick={() => sortData("married")}
                >
                  Married
                </th>
                <th
                  className="cursor-pointer"
                  onClick={() => sortData("phone")}
                >
                  Phone
                </th>
                <th
                  className="cursor-pointer"
                  onClick={() => sortData("salary")}
                >
                  Salary
                </th>
              </tr>
            </thead>
            <tbody>
              {contacts?.map((contact) => (
                <tr key={contact.contactId} className="border-b">
                  <td className="py-3 px-6">
                    {editRowId === contact.contactId ? (
                      <input
                        type="text"
                        name="name"
                        value={editedContact?.name || ""}
                        onChange={handleInputChange}
                        className="border rounded w-full px-2"
                      />
                    ) : (
                      contact.name
                    )}
                  </td>
                  <td className="py-3 px-6">
                    {editRowId === contact.contactId ? (
                      <input
                        type="text"
                        name="dateOfBirth"
                        value={editedContact?.dateOfBirth || ""}
                        onChange={handleInputChange}
                        className="border rounded w-full px-2"
                      />
                    ) : (
                      new Date(contact.dateOfBirth).toLocaleDateString()
                    )}
                  </td>
                  <td className="py-3 px-6">
                    {editRowId === contact.contactId ? (
                      <input
                        type="checkbox"
                        name="married"
                        checked={editedContact?.married || false}
                        onChange={(e) =>
                          setEditedContact({
                            ...editedContact!,
                            married: e.target.checked,
                          })
                        }
                      />
                    ) : contact.married ? (
                      "Yes"
                    ) : (
                      "No"
                    )}
                  </td>
                  <td className="py-3 px-6">
                    {editRowId === contact.contactId ? (
                      <input
                        type="text"
                        name="phone"
                        value={editedContact?.phone || ""}
                        onChange={handleInputChange}
                        className="border rounded w-full px-2"
                      />
                    ) : (
                      contact.phone
                    )}
                  </td>
                  <td className="py-3 px-6">
                    {editRowId === contact.contactId ? (
                      <input
                        type="number"
                        name="salary"
                        value={editedContact?.salary || 0}
                        onChange={handleInputChange}
                        className="border rounded w-full px-2"
                      />
                    ) : (
                      `$${contact.salary.toFixed(2)}`
                    )}
                  </td>
                  <td className="py-3 px-6 flex justify-center space-x-2">
                    {editRowId === contact.contactId ? (
                      <>
                        <button
                          onClick={handleSaveClick}
                          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditRowId(null)}
                          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-200"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEditClick(contact)}
                          className="bg-yellow-400 text-white px-4 py-2 rounded-lg hover:bg-yellow-500 transition duration-200"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteContact(contact.contactId)}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Toaster position="top-right" reverseOrder={false} />
        </div>
      ) : (
        <h2 className="text-balck text-2xl flex items-center justify-center">
          There are not data
        </h2>
      )}
    </>
  );
};

export default DataTable;
