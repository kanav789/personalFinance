"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm, Controller } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import axios from "axios";

import { useAppDispatch } from "@/lib/hooks";
import { setData } from "@/redux/feature/dateSlice";


export function EditTransactions(id: any) {


    const [open, setOpen] = useState(false);
    const { register, handleSubmit, control, reset, formState: { errors } } = useForm();

    const [buttonLoader, setButtonLoader] = useState(false)

    useEffect(() => {



        fetchTransactionData();


    }, [])
    const fetchTransactionData = async () => {

            try {

                const fetcheddata = await axios.post('api/get', {
                    id: id.id
                })



                if (fetcheddata?.status === 200) {
                    // setTransactionData(fetcheddata.data.transaction);
                    reset({
                        traAmount: fetcheddata.data.transaction.traAmount,
                        transactionDescription: fetcheddata.data.transaction.transactionDescription,
                        transactionDate: fetcheddata.data.transaction.transactionDate
                    });
                } else {
                    console.log("Failed to fetch transaction data");
                }

            } catch (error) {
                console.log("Error fetching transaction data:", error);

            }
        }

    const dispatch = useAppDispatch()

    const onSubmit = async (data: any) => {
        setButtonLoader(true);
        const body = {
            id: id.id,
            ...data
        };
        const edit = await fetch("api/edit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        console.log("edit", edit)

        if (edit?.status === 200) {

            const updatedTransactions = await axios.get('/api/all')
            if (updatedTransactions.status === 200) {
                dispatch(setData(updatedTransactions?.data?.data))
            }
            setOpen(false);
            reset();
        }
        setButtonLoader(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>

            <span
                className="px-3 py-1 text-sm font-medium cursor-pointer"
                onClick={() => setOpen(true)}
            >
                Edit
            </span>

            <DialogContent className="sm:max-w-[425px] ">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                        <DialogTitle>
                            {"Edit Transaction"}
                        </DialogTitle>

                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-3">
                            <Label htmlFor="amount">Amount</Label>
                            <Input
                                id="amount"
                                type="number"
                                min="0"
                                step="0.01"
                                {...register("traAmount", { required: true, maxLength: 6 })}
                                placeholder="Enter amount"
                                required
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="description">Description</Label>
                            <Input
                                id="description"
                                type="text"
                                {...register("transactionDescription", { required: true })}
                                placeholder="Where did you spend?"
                                required
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="date">Date</Label>
                            <Controller
                                name="transactionDate"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <DatePicker
                                        {...field}
                                        selected={field.value ? new Date(field.value) : null}
                                        onChange={(date) => {
                                            const formattedDate = date
                                                ? date.toISOString().slice(0, 10)
                                                : "";
                                            field.onChange(formattedDate);
                                        }}
                                        className="border px-3 py-2 rounded w-full"
                                        dateFormat="yyyy-MM-dd"
                                        id="date"
                                        required
                                        placeholderText="Select a date"
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" type="button" className="cursor-pointer">
                                Cancel
                            </Button>
                        </DialogClose>
                        {buttonLoader ? (
                            <div><ClipLoader /></div>
                        ) : (
                            <Button type="submit" className="cursor-pointer" disabled={buttonLoader}>
                                {buttonLoader ? <ClipLoader size={20} /> : "Save"}
                            </Button>
                        )}
                    </DialogFooter>
                </form>
            </DialogContent>

        </Dialog>
    );
}
