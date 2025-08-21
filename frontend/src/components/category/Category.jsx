import React from 'react'

const Category = () => {
  const categories = ["Technology", "Lifestyle", "Travel", "Food", "Education", "Health", "Business"];

  return (
    <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-5">
      <h2 className="text-xl font-semibold text-indigo-700 mb-4 border-b pb-2">Categories</h2>
      <ul className="space-y-2">
        {categories.map((cat, index) => (
          <li
            key={index}
            className="text-gray-700 hover:text-indigo-600 cursor-pointer transition font-medium"
          >
            # {cat}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Category
