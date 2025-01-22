import React, {useState} from 'react'
import './App.css'

const singleSelectOptions = ['Option 1', 'Option2 ', 'Option 3']
const initialMultiSelectOptions = ['Option A', 'Option B', 'Option C']

const App = () => {
  const [rows, setRows] = useState([])
  const [multiSelectOptions, setMultiSelectOptions] = useState(
    initialMultiSelectOptions,
  )
  const [newMultiSelectValue, setNewMultiSelectValue] = useState('')

  const addRow = () => {
    setRows([...rows, {singleSelect: '', multiSelect: []}])
  }

  const handleSingleSelectChange = (index, value) => {
    const updatedRows = [...rows]
    updatedRows[index].singleSelect = value
    setRows(updatedRows)
  }

  const handleMultiSelectChange = (index, selectedValues) => {
    const updatedRows = [...rows]
    updatedRows[index].multiSelect = selectedValues
    setRows(updatedRows)
  }

  const handleAddOption = () => {
    if (
      newMultiSelectValue &&
      !multiSelectOptions.includes(newMultiSelectValue)
    ) {
      setMultiSelectOptions([...multiSelectOptions, newMultiSelectValue])
      setNewMultiSelectValue('')
    }
  }

  return (
    <div className="app">
      <table className="table">
        <thead>
          <tr>
            <th>Column 1</th>
            <th>Column 2</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>
                <select
                  value={row.singleSelect}
                  onChange={e =>
                    handleSingleSelectChange(index, e.target.value)
                  }
                >
                  <option value="">Select an option</option>
                  {singleSelectOptions
                    .filter(
                      option => !rows.some(r => r.singleSelect === option),
                    )
                    .map((option, i) => (
                      <option key={i} value={option}>
                        {option}
                      </option>
                    ))}
                </select>
              </td>
              <td>
                <select
                  multiple
                  value={row.multiSelect}
                  onChange={e =>
                    handleMultiSelectChange(
                      index,
                      Array.from(
                        e.target.selectedOptions,
                        option => option.value,
                      ),
                    )
                  }
                >
                  {multiSelectOptions.map((option, i) => (
                    <option key={i} value={option}>
                      {option}
                    </option>
                  ))}
                  <option value="" disabled>
                    Add New...
                  </option>
                </select>
                <input
                  type="text"
                  value={newMultiSelectValue}
                  onChange={e => setNewMultiSelectValue(e.target.value)}
                />
                <button onClick={handleAddOption}>Add</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={addRow}>Add New Row</button>
    </div>
  )
}

export default App
