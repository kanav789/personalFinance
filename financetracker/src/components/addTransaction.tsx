"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
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
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { GetData, PostData } from "@/lib/customfetchdata";
import { setData } from "@/redux/feature/dateSlice";


export function AddTransaction() {

    const [Loader, setLoader] = useState(false);
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, control, reset, } = useForm();
    const userdata = useAppSelector((state: any) => state?.auth?.user)
    const dispacth = useAppDispatch()
    console.log("User Data:", userdata?.user?.email);
    const onSubmit = async (data: any) => {
        setLoader(true);
        const body = { ...data, email: userdata?.user?.email };
        const add = await PostData("/api/add", body);
        console.log(add, "add")
        setLoader(false);
        if (add) {
            const data = await GetData("/api/all")
            dispacth(setData(data?.data))
            setOpen(false);

            reset();
    }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>

            <Button
                className="px-4 py-2 text-sm font-semibold cursor-pointer"
                onClick={() => setOpen(true)}
            >
                Add Expense
            </Button>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                        <DialogTitle>
                            {"Add Transaction"}
                        </DialogTitle>
                        <DialogDescription>
                            {"Add a new expense to your tracker."}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-3">
                            <Label htmlFor="amount">Amount</Label>
                            <Input
                                id="amount"
                                type="number"
                                min="0"
                                step="0.01"
                                {...register("amount", { required: true, maxLength: 6 })}
                                placeholder="Enter amount"
                                required
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="description">Description</Label>
                            <Input
                                id="description"
                                type="text"
                                {...register("description", { required: true })}
                                placeholder="Where did you spend?"
                                required
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="date">Date</Label>
                            <Controller
                                name="date"
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
                        {Loader ? (
                            <div className="flex justify-center"><ClipLoader /></div>
                        ) : (
                            <Button type="submit" className="cursor-pointer">
                                Save changes
                            </Button>
                        )}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
