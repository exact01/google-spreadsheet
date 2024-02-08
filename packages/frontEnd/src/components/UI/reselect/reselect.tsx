import React from 'react'
import Select, { SingleValue } from 'react-select'
import './selectPopup.scss'
import { ISelectTemplate } from '@/components/UI/reselect/reslect.interface'

interface IProps {
    getValue: ISelectTemplate[];
    onChangeSelect: (selectedValue: SingleValue<ISelectTemplate>) => void;
    placeholder: string
    noOptionsMessage: string
    value: SingleValue<ISelectTemplate> | null
}
const Reselect: React.FC<IProps> = ({ getValue, onChangeSelect, noOptionsMessage, placeholder, value }) => {
    return (
        <Select
            placeholder={placeholder}
            classNamePrefix={'selectPopup'}
            options={getValue}
            noOptionsMessage={() => noOptionsMessage}
            onChange={onChangeSelect}
            value={value}
        />
    )
}

export default Reselect
