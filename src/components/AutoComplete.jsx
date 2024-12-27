import { useState, useEffect, useRef } from 'react'

export default function Autocomplete({ options, onSelect, placeholder, initialValue = '' }) {
  const [inputValue, setInputValue] = useState(initialValue)
  const [filteredOptions, setFilteredOptions] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleInputChange = (e) => {
    const value = e.target.value
    setInputValue(value)
    setIsOpen(true)

    const filtered = options.filter(option =>
      option.label.toLowerCase().includes(value.toLowerCase())
    )
    setFilteredOptions(filtered)
  }

  const handleOptionSelect = (option) => {
    setInputValue(option.label)
    setIsOpen(false)
    onSelect(option)
  }

  return (
    <div className="relative" ref={inputRef}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder}
        className="mt-1 block w-full rounded-md bg-[#132D46] border-[#01C38D] text-white shadow-sm focus:border-[#01C38D] focus:ring focus:ring-[#01C38D] focus:ring-opacity-50 px-4 py-2"
      />
      {isOpen && filteredOptions.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full bg-[#132D46] border border-[#01C38D] rounded-md max-h-60 overflow-auto">
          {filteredOptions.map((option) => (
            <li
              key={option.value}
              onClick={() => handleOptionSelect(option)}
              className="px-4 py-2 hover:bg-[#01C38D] hover:text-[#191E29] cursor-pointer"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

