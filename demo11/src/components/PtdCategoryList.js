import React from 'react';

export default function PtdCategoryList({ renderPtdCategories, onAddNew, onPtdDelete, onPtdEdit }) {
  console.log("renderPtdCategories: ", renderPtdCategories);

  const ptdCategoryElement = renderPtdCategories.map((ptdCategory, index) => {
    return (
      <tr key={index}>
        <th>{index + 1}</th>
        <td>{ptdCategory.PtdId}</td>
        <td>{ptdCategory.PtdCategoryName}</td>
        <td>{ptdCategory.PtdCategoryStatus ? "Hiển thị" : "Tạm khóa"}</td>
        <td>
          <button className='btn btn-danger' onClick={() => ptdHandleDelete(ptdCategory.PtdId)}>Delete</button>
          <button className='btn btn-success' onClick={() => ptdHandleEdit(ptdCategory)}>Edit</button>
        </td>
      </tr>
    );
  });

  const ptdHandleAdd = () => {
    onAddNew(true);
  };

  const ptdHandleDelete = (PtdId) => {
    if (window.confirm(`Bạn có muốn xóa Category có mã [${PtdId}] không?`)) {
      console.log("Delete:", PtdId);
      onPtdDelete(PtdId);
    }
  };

  const ptdHandleEdit = (ptdCategory) => {
    onPtdEdit(ptdCategory);
  };

  return (
    <div className='container m-2'>
      <h2>Danh Sách Loại Sản Phẩm</h2>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>#</th>
            <th>Mã loại</th>
            <th>Tên loại</th>
            <th>Trạng thái</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {ptdCategoryElement}
        </tbody>
      </table>
      <button className='btn btn-primary' onClick={ptdHandleAdd}>Thêm mới</button>
    </div>
  );
}
