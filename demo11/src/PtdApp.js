import './App.css';
import { React, useEffect, useState } from 'react';
import axios from './api/PtdApi';
import PtdCategoryList from './components/PtdCategoryList';
import PtdCategoryForm from './components/PtdCategoryForm';

function PtdApp() {
  const [ptdCategories, setPtdCategories] = useState([]);
  const [ptdCategoryIsForm, setPtdCategoryIsForm] = useState(false);
  const [ptdCategoryEdit, setPtdCategoryEdit] = useState({});

  const getCategories = async () => {
    try {
      const ptdCateResponse = await axios.get("PtdCategory");
      setPtdCategories(ptdCateResponse.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const ptdHandleAddNew = (param) => {
    setPtdCategoryIsForm(param);
  };

  const ptdHandleCategoryCloseForm = (param) => {
    setPtdCategoryIsForm(param);
  };

  const ptdHandleCategorySubmit = (param) => {
    const id = ptdCategories.length ? ptdCategories[ptdCategories.length - 1].PtdId : 0;
    param.PtdId = id + 1;
    setPtdCategories((prev) => [...prev, param]);
    setPtdCategoryIsForm(false);
  };

  const ptdHandleDelete = async (PtdId) => {
    try {
      const ptdResponse = await axios.delete(`PtdCategory/${PtdId}`);
      console.log("ptdResponse.Delete", ptdResponse);
      setPtdCategories((prev) => prev.filter(x => x.PtdId !== PtdId));
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const ptdHandleEdit = (ptdCategory) => {
    setPtdCategoryEdit(ptdCategory);
    setPtdCategoryIsForm(true);
  };

  return (
    <div className="container border my-3">
      <h1> Pham Thanh Dat - Call API</h1>
      <PtdCategoryList
        renderPtdCategories={ptdCategories}
        onAddNew={ptdHandleAddNew}
        onPtdDelete={ptdHandleDelete}
        onPtdEdit={ptdHandleEdit}
      />
      <hr />
      {
        ptdCategoryIsForm && (
          <PtdCategoryForm
            renderPtdCategory={ptdCategoryEdit}
            onCloseForm={ptdHandleCategoryCloseForm}
            onCategorySubmit={ptdHandleCategorySubmit}
          />
        )
      }
    </div>
  );
}

export default PtdApp;
