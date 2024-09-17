import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import type { DraftExpense, Value } from '../types';
import { categories } from '../data/categories'
import DatePicker from 'react-date-picker';
import 'react-calendar/dist/Calendar.css'
import 'react-date-picker/dist/DatePicker.css'
import ErrorMessage from './ErrorMessage';
import { useBudget } from '../hooks/useBudget';

export default function ExpenseForm() {

    const[expenses, setExpenses] = useState<DraftExpense>({
        amount: 0,
        expenseName: '',
        category: '',
        date: new Date()
    })

    const[error, setError] = useState('')

    const[previousAmount, setPreviousAmount ] = useState(0)

    const {dispatch, state, remainingBudget} = useBudget()

    useEffect(() => {
        if(state.editingId) {
            const editingExpense = state.expenses.filter(currentExpense => currentExpense.id === state.editingId)[0]
            setExpenses(editingExpense)
            setPreviousAmount(editingExpense.amount)
        }
    }, [state.editingId])

    //Funcion para cambiar el estado de los strings
    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target
        //Esto va a verificar que el campo sea un numero
        const isAmountField = ['amount'].includes(name)
        // console.log(isAmountField);
        setExpenses({
            ...expenses,
            //Aqui comprobora si el campo llenado en cuestion es amount entonces lo convertira en number y si no pasa como string
            [name]: isAmountField ? +value : value
        })
    }

    //Funcion para cambiar el estado de la fecha
    const handleChangeDate = (value : Value) => {
        setExpenses({
            // Toma una copia del estado
            ...expenses,
            // Escribe sobre el estado en el campo date
            date: value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        //Validacion por si algun campo no se llena
        if(Object.values(expenses).includes('')) {
            setError('Todos los cambios son obligatorios')
            return
        }
        //Validacion para no gastar mas del presupuesto
        if((expenses.amount - previousAmount) > remainingBudget) {
            setError('Ese gasto se sale del presupuesto')
            return
        }

        //Agrega o actualizar el gasto
        if(state.editingId) {
            dispatch({type: 'update-expense', payload: {expense: {id: state.editingId, ...expenses}}})
        } else {
            dispatch({type:'add-expense', payload: { expenses }})
        }

        
        // //Reiniciar el state
        setExpenses({
            amount: 0,
            expenseName: '',
            category: '',
            date: new Date()
        })
    }

    return (
        <form className='space-y-5' onSubmit={handleSubmit}>
            <legend className='uppercase text-center text-2xl font-black border-b-4 border-green-300 py-2 text-green-500'>
                {state.editingId ? 'Guardar cambios' : 'Nuevo gasto'}
            </legend>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            {/* Nombre del gasto */}
            <div className='flex flex-col gap-2'>
                <label 
                    htmlFor="expenseName"
                    className='text-xl'
                >Nombre gasto:</label>
                <input
                    id='expenseName'
                    type="text"
                    placeholder='Añade el nombre del gasto'
                    className='bg-slate-100 p-2'
                    name='expenseName'
                    value={expenses.expenseName}
                    onChange={handleChange}
                />
            </div>
            {/* Cantidad gastada */}
            <div className='flex flex-col gap-2'>
                <label 
                    htmlFor="amount"
                    className='text-xl'
                >Cantidad:</label>
                <input
                    id='amount'
                    type="number"
                    placeholder='Añade la cantidad del gasto, ej: 300'
                    className='bg-slate-100 p-2'
                    name='amount'
                    value={expenses.amount}
                    onChange={handleChange}
                />
            </div>
            {/* Categorias */}
            <div className='flex flex-col gap-2'>
                <label 
                    htmlFor="category"
                    className='text-xl'
                >Categoria:</label>
                <select
                    id='category'
                    // placeholder='Añade el nombre del gasto'
                    className='bg-slate-100 p-2'
                    name='category'
                    value={expenses.category}
                    onChange={handleChange}
                >
                    <option value="">-- Seleccione --</option>
                    {categories.map(categorie => (
                        <option
                            key={categorie.id}
                            value={categorie.id}>
                            {categorie.name}
                        </option>
                    ))}
                </select>
            </div>
            {/* Seleccion de fecha */}
            <div className='flex flex-col gap-2'>
                <label 
                    htmlFor="amount"
                    className='text-xl'
                >Fecha gasto:</label>
                <DatePicker 
                    className='bg-slate-100 p-2 border-0'
                    value={expenses.date}
                    onChange={handleChangeDate}
                />
            </div>
            <input 
                type="submit" 
                className='bg-green-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg'
                value={state.editingId ? 'Guardar cambios' : 'Registrar dato'}
            />
        </form>
    )
}
