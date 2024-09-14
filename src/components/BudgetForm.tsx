import { ChangeEvent, FormEvent, useMemo, useState } from "react"
import { useBudget } from "../hooks/useBudget"

export default function BudgetForm() {

    //Aqui estara el state de este componente
    const [budget, setBudget] = useState(0)

    const {dispatch} = useBudget()

    //Escribiendo en el state
    const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
        //Modificando el state y manteniendo el valor
        setBudget(e.target.valueAsNumber)
    }

    //Validando que se aun numero y no un string
    const isValid = useMemo(() => {
        return isNaN(budget) || budget <= 0
    }, [budget])

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch({type:'add-budget', payload: {budget}})
    }

    return (
        <form action="" className="space-y-5" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-5">
                <label htmlFor="budget" className="text-3xl text-green-600 font-bold text-center">
                    Definir presupuesto
                </label>
                <input
                    id="budget"
                    type="number"
                    className="w-full bg-white border border-gray-200 p-2 rounded-md shadow-sm "
                    placeholder="Define tu presupuesto"
                    name="budget"
                    value={budget}
                    onChange={handleChange}
                />
            </div>

            <input 
                type="submit"
                value="Definir presupuesto"
                className="bg-green-600 hover:bg-green-700 cursor-pointer w-full p-2 text-white font-black uppercase rounded-md disabled:opacity-40 disabled:cursor-auto"
                disabled={isValid}
            />
        </form>
    )
}
