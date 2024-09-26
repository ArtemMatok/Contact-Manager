import axios from "axios";
import { Contact } from "../Models/Contact";

const api = "http://localhost:5000/api/Contact/";

export const UploadCSV = async (file: any) => {
  try {
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
      console.log(formData);
    } else {
      console.error("File is null or undefined");
      return;
    }

    var data = await axios.post<Contact>(api + "Upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const GetContactsAll = async () => {
  try {
    const data = await axios.get<Contact[]>(api + "GetAll");
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const UpdateContact = async(contactId:number, updateontact:Contact) => {
  try {
    const data = await axios.put<Contact[]>(api + `UpdateContact/${contactId}`, updateontact);
    return data.data;
  } catch (error) {
    console.log(error);
  }
}

export const DeleteContact = async(contactId:number) => {
  try {
    const data = await axios.delete<Contact[]>(api + `Delete/${contactId}`);
    return data.data;
  } catch (error) {
    console.log(error);
  }
}