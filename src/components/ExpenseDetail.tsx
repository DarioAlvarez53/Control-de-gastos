import { useMemo } from "react"
import { 
    LeadingActions, //Estas son las acciones que viene del lado izquierdo
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions //Estas son las acciones que viene del lado derecho
} from "react-swipeable-list"
import { Expense } from "../types"
import { formatDate } from "../utils"
import AmountDisplay from "./AmountDisplay"
import { categories } from "../data/categories"
import { useBudget } from "../hooks/useBudget"
import "react-swipeable-list/dist/styles.css"

type ExpenseDetailProps = {
    expense: Expense
}

export default function ExpenseDetail({expense}: ExpenseDetailProps) {

    const {dispatch} = useBudget()

    const categoryInfo = useMemo(() => categories.filter(cat => cat.id === expense.category)[0] ,[expense])

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => {}}>
                Actualizar
            </SwipeAction>
        </LeadingActions>
    )

    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction onClick={() => dispatch({type: 'remove-expense', payload: {id: expense.id}})} destructive={true}>
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )

    return (
        <SwipeableList>
            <SwipeableListItem
                maxSwipe={30} //estos son los pixeles que quieres que se recora para disparar las acciones
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
                <div className="w-full bg-white shadow-lg p-10 border-b border-gray-200 flex gap-5 items-center mt-2">
                    {/* Mostrar la imagen de la categoria */}
                    <div>
                        <img
                            src={`/icono_${categoryInfo.icon}.svg`}
                            alt={categoryInfo.name}
                            className="w-20"
                        />
                    </div>

                    {/* Va a tener la informacion del gasto */}
                    <div className="flex-1 space-y-2">
                        <p className="text-sm font-bold uppercase text-slate-500">{categoryInfo.name}</p>
                        <p>{expense.expenseName}</p>
                        <p className="text-slate-600 text-sm">{formatDate(expense.date!.toString())}</p>
                    </div>

                    {/* Cantidad */}
                    <AmountDisplay 
                        amount={expense.amount}
                    />
                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}
