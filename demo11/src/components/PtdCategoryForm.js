import React, { useEffect, useState } from 'react';
import axios from '../api/PtdApi';

export default function PtdCategoryForm({ onCloseForm, onCategorySubmit, renderPtdCategory }) {
  const [PtdId, setPtdId] = useState("");
  const [ptdCategoryName, setPtdCategoryName] = useState("");
  const [ptdCategoryStatus, setPtdCategoryStatus] = useState(true);

  useEffect(() => {
    setPtdId(renderPtdCategory.PtdId || "");
    setPtdCategoryName(renderPtdCategory.PtdCategoryName || "");
    setPtdCategoryStatus(renderPtdCategory.PtdCategoryStatus || true);
  }, [renderPtdCategory]);

  const ptdHandleClose = () => {
    onCloseForm(false);
  };

  const ptdHandleSubmit = async (event) => {
    event.preventDefault();
    let ptdCategory = {
      PtdId: PtdId || 0,
      PtdCategoryName: ptdCategoryName,
      PtdCategoryStatus: ptdCategoryStatus
    };
    console.log("ptdCategory", ptdCategory);
    await axios.post("ptdCategory", ptdCategory);
    onCategorySubmit(ptdCategory);
  };

  return (
    <div>
      <form>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Category Name</span>
          <input type="text" className="form-control"
            name='ptdCategoryName'
            value={ptdCategoryName}
            onChange={(ev) => setPtdCategoryName(ev.target.value)}
            placeholder="Category Name" aria-label="Category Name" aria-describedby="basic-addon1" />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Category Status</span>
          <select className='form-control'
            name='ptdCategoryStatus'
            value={ptdCategoryStatus}
            onChange={(ev) => setPtdCategoryStatus(ev.target.value === 'true')}>
            <option value={true}>Hien thi</option>
            <option value={false}>Tam khoa</option>
          </select>
        </div>
        <button className='btn btn-primary' onClick={ptdHandleSubmit}>Ghi lai</button>
        <button className='btn btn-danger' onClick={ptdHandleClose}>Dong</button>
      </form>
    </div>
  );
}
