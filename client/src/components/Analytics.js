import React from 'react'
import { Progress } from 'antd'

const Analytics = ({allTransaction }) => {
        // category
    const categories = [
        "food",
        "fee",
        "salary",
        "bill",
        "rent",
        "medical",
        "movie",
        "petrol",
        "others"
    ]
        
        // Transactions
    const totalTransaction = allTransaction.length
    const totalIncomeTransaction = allTransaction.filter((transcation) => transcation.type === "income");
    const totalExpenseTransaction = allTransaction.filter((transcation) => transcation.type === "expense");
    const totalIncomePercent = (totalIncomeTransaction.length / totalTransaction) * 100;
    const totalExpensePercent = (totalExpenseTransaction.length / totalTransaction) * 100;
    
        // TurnOver
    const totalTurnover = allTransaction.reduce(
        (sum , transcation) => sum + transcation.amount , 0);
    const totalIncomeTurnover = allTransaction.filter(
        (transcation) => transcation.type === "income"
    ).reduce((sum , transaction)=> sum + transaction.amount , 0)
    const totalExpenseTurnover = allTransaction.filter(
        (transcation) => transcation.type === "expense"
    ).reduce((sum , transaction)=> sum + transaction.amount , 0)

    const totalIncomeTurnoverPercent = (totalIncomeTurnover / totalTurnover) * 100;
    const totalExpenseTurnoverPercent = (totalExpenseTurnover / totalTurnover) * 100;

    return (
    <>
        <div className="row m-3">
            
            <div className="col-md-3">
                <div className="card">
                    <div className="card-header">
                        Total Transactions : {totalTransaction}
                    </div>
                    <div className="card-body">
                        <h5 className='text-success'>Income : {totalIncomeTransaction.length}</h5>
                        <h5 className='text-danger'>Expense : {totalExpenseTransaction.length}</h5>
                    </div>

                    <div>
                        <Progress type = "circle" strokeColor={'green'}
                        className= "mx-2 p-4"
                        percent={totalIncomePercent.toFixed(0) }
                        />
                        <Progress type = "circle" strokeColor={'red'}
                        className= "mx-2 p-4"
                        percent={totalExpensePercent.toFixed(0) }
                        />
                    </div>
                </div>
            </div>


            <div className="col-md-3">
                <div className="card">
                    <div className="card-header">
                            Total TurnOver : {totalTurnover}
                        </div>
                        <div className="card-body">
                            <h5 className='text-success'>Income : {totalIncomeTurnover}</h5>
                            <h5 className='text-danger'>Expense : {totalExpenseTurnover}</h5>
                        </div>

                        <div>
                            <Progress type = "circle" strokeColor={'green'}
                            className= "mx-2 p-4"
                            percent={totalIncomeTurnoverPercent.toFixed(0) }
                            />
                            <Progress type = "circle" strokeColor={'red'}
                            className= "mx-2 p-4"
                            percent={totalExpenseTurnoverPercent.toFixed(0) }
                            />
                        </div>
                </div>
            </div>

            <div className="col-md-3">
                <h4> CategoryWise Income </h4>
                {
                    categories.map(category => {
                        const amount = allTransaction.filter(transaction => transaction.type === 'income' && transaction.category === category)
                        .reduce((sum,transaction) => sum + transaction.amount , 0);

                        return (
                            amount > 0 && 
                            <div className="card">
                                <div className="card-body">
                                    <h5> {category} </h5>
                                    <Progress percent = {((amount/totalIncomeTurnover) * 100).toFixed(0)} />
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            <div className="col-md-3">
                <h4 > CategoryWise Expense </h4>
                {
                    categories.map(category => {
                        const amount = allTransaction.filter(transaction => transaction.type === 'expense' && transaction.category === category)
                        .reduce((sum,transaction) => sum + transaction.amount , 0);

                        return (
                            amount > 0 && 
                            <div className="card mt-2">
                                <div className="card-body">
                                    <h5> {category} </h5>
                                    <Progress percent = {((amount/totalExpenseTurnover) * 100).toFixed(0)} />
                                </div>
                            </div>
                        )
                    })
                }
            </div>

        </div>

    </>
  )
}

export default Analytics