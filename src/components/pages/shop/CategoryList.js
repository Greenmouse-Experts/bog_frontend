import React from 'react';

const CategoryList = ({ category, clickHandler, activeState, active }) => {
  const handleClick = () => {
    clickHandler(category.id)
  }
  return (

    <li
      className="py-2 cursor-pointer"
      key={category.id}
      style={active === category.id ? activeState : undefined}
      onClick={handleClick}
    >{category.name} ({category.totalProducts})</li>
  )
}

export default CategoryList;

export const MobileCategory = ({ category, clickHandler, activeState, active }) => {
  const handleClick = () => {
    clickHandler(category.id)
  }
  return (

    <option
      className="py-2 cursor-pointer"
      key={category.id}
      value={category.id}
      style={active === category.id ? activeState : undefined}
      onClick={handleClick}
    >{category.name}</option>
  )
}
