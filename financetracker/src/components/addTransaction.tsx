"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"


interface AddTransactionProps {
    onAdd?: any,
    onedit?: any,
}

export function AddTransaction({ onAdd, onedit }: AddTransactionProps) {
    const [edit, setEdit] = useState(false)
    const [amount, setAmount] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState(new Date())

    const handleSubmit = ({ e }: any) => {
        e.preventDefault()
        // if (!amount || !description) return
        // if (onAdd) {
        //     onAdd({
        //         amount: parseFloat(amount),
        //         description,
        //         date,
        //     })
        // }
        console.log(amount, description, date, "data")
        // Reset fields
        // setAmount("")
        // setDescription("")
        // setDate(new Date())
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="px-6 py-3 text-lg font-semibold cursor-pointer">
                    Add Expense
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>
                            {edit ? "Edit Transaction" : "Add Transaction"}
                        </DialogTitle>
                        <DialogDescription>
                            {edit
                                ? "Edit your transaction details below."
                                : "Add a new expense to your tracker."}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-3">
                            <Label htmlFor="amount">Amount</Label>
                            <Input
                                id="amount"
                                name="amount"
                                type="number"
                                min="0"
                                step="0.01"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="description">Description</Label>
                            <Input
                                id="description"
                                name="description"
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="date">Date</Label>
                            <DatePicker
                                selected={date}
                                onChange={setDate}
                                className="border px-3 py-2 rounded w-full"
                                dateFormat="yyyy-MM-dd"
                                id="date"
                                name="date"
                                required
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" type="button" className="cursor-pointer">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" className="cursor-pointer">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
