//Este componente va a mostar cuanto presupuesto definimos, cuanto llevamos gastado y cuanto nos queda
import { CircularProgressbar, buildStyles} from "react-circular-progressbar"
import { useBudget } from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";
import "react-circular-progressbar/dist/styles.css"

export default function BudgetTracker() {

    const {state, totalExpenses, remainingBudget} = useBudget()

    //Calculando porcentaje para la grafica
    const percetnage = +((totalExpenses / state.budget) * 100).toFixed(2)
    // console.log(percetnage);
    

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex justify-center">
                {/* Desarrollando la grafica con react-circular-progressbar */}
                <CircularProgressbar 
                    value={percetnage}
                    styles={buildStyles({
                        pathColor: percetnage === 100 ? '#DC2626' :'#16a34a', //Este es el color e la grafica
                        trailColor: '#dcfce8', //Esto es lo que le da color a lo que no se esta graficando
                        textSize: 8,
                        textColor: percetnage === 100 ? '#DC2626' :'#16a34a',
                    })}
                    text={`${percetnage}% Gastado`}
                />
            </div>
            <div className="flex flex-col justify-center items-center gap-8">
                <button
                    type="button"
                    className="bg-red-600 w-full p-2 text-white uppercase font-bold rounded-lg"
                >
                    Resetar App
                </button>

                <AmountDisplay 
                    label="Presupuesto"
                    amount={state.budget}
                />

                <AmountDisplay 
                    label="Disponible"
                    amount={remainingBudget}
                />

                <AmountDisplay 
                    label="Gastado"
                    amount={totalExpenses}
                />
            </div>
        </div>
    )
}
