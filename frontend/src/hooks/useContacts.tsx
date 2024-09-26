import { ChangeEvent, useEffect, useState } from "react";
import { Contact } from "../Models/Contact";
import { DeleteContact, GetContactsAll, UpdateContact } from "../Services/Contact";
import toast from "react-hot-toast";
import { isValidDate } from "../lib/isValidDate";

export const useContacts = () => {
    const [contacts, setContacts] = useState<Contact[]>();
    const [editRowId, setEditRowId] = useState<number | null>(null);
    const [editedContact, setEditedContact] = useState<Contact | null>(null);
    const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
    const [sortConfig, setSortConfig] = useState<{
      key: string;
      direction: string;
    } | null>(null);
    const [filter, setFilter] = useState<string>("");
  
  
  
    useEffect(() => {
      const getAll = async () => {
        const data = await GetContactsAll();
        console.log(data);
        if (data) {
          setContacts(data);
          setFilteredContacts(data);
        }
      };
      getAll();
    }, [editRowId]);
  
  
    const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value.toLowerCase());
        const filtered = contacts?.filter((contact) =>
          contact.name.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredContacts(filtered!);
      };
    
    const sortData = (key: keyof Contact) => {
      let direction = "asc";
      if (
        sortConfig &&
        sortConfig.key === key &&
        sortConfig.direction === "asc"
      ) {
        direction = "desc";
      }
      const sorted = [...filteredContacts].sort((a, b) => {
        if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
        if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
        return 0;
      });
      setSortConfig({ key, direction });
      setFilteredContacts(sorted);
    };
  
    const deleteContact = (contactId: number) => {
      const deleting = async () => {
        const data = await DeleteContact(contactId);
        if (data) {
          setContacts(data);
          setFilteredContacts(data!);
        }
      };
  
      deleting();
    };
  
    const updateContact = (contactId: number, editContact: Contact) => {
      const update = async () => {
        const data = await UpdateContact(contactId, editContact);
        setContacts(data);
        setFilteredContacts(data!);
      };
      update();
      setEditRowId(null); // Вихід з режиму редагування після успішного оновлення
    };
  
    const handleEditClick = (contact: Contact) => {
      setEditRowId(contact.contactId);
      setEditedContact({ ...contact });
    };
  
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (editedContact) {
        setEditedContact({
          ...editedContact,
          [e.target.name]: e.target.value,
        });
      }
    };
  
    const handleSaveClick = () => {
      if (editedContact) {
        if (editedContact.name === "" || editedContact.phone === "") {
          toast.error("Name and Phone are required");
          return;
        }
  
        const phoneRegex = /^\d{9}$/;
        if (!phoneRegex.test(editedContact.phone)) {
          toast.error("Phone number must contain exactly 10 digits.");
          return;
        }
  
        if (!isValidDate(editedContact.dateOfBirth)) {
          toast.error("Invalid date of birth format. Please use YYYY-MM-DD.");
          return;
        }
        if (editRowId) {
          updateContact(editRowId, editedContact);
        }
  
        console.log(editedContact);
      }
    };


    return {
        contacts:filteredContacts,
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
    }
}