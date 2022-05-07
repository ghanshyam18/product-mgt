import React from 'react';
import { Input, Select } from 'antd';

const { Option } = Select;

function ProductFilter(props) {
  const { handleSearch, sorting, handleSort } = props;

  return (
    <>
      <div>
        <Input onChange={handleSearch} placeholder="Search by name, price, description..." />
      </div>
      <div>
        <Select allowClear value={sorting?.price} onChange={(val) => handleSort(val, 'price')} placeholder="Sort by Price">
          <Option value="asc">Low to High</Option>
          <Option value="desc">High to Low</Option>
        </Select>
      </div>
      <div>
        <Select allowClear value={sorting?.rating} onChange={(val) => handleSort(val, 'rating')} placeholder="Sort by Rating">
          <Option value="asc">Low to High</Option>
          <Option value="desc">High to Low</Option>
        </Select>
      </div>
    </>
  )
}

export default ProductFilter