"use client"
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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setData } from "@/redux/feature/dateSlice";
import { GetData, PostData } from "@/lib/customfetchdata";
export default function AddBudget() {
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, control, reset, } = useForm();
    const [Loader, setLoader] = useState(false)
    const dispatch = useAppDispatch()
    const userdata = useAppSelector((state): any => state?.auth?.user)
    const onSubmit = async (data: any) => {
        try {
            setLoader(true);
            const body = {
                ...data,
                email: userdata?.user?.email
            }
            const response = await PostData('api/budget/add', body)

            if (response) {
                const addedbudget = await GetData('api/budget/list')

                if (addedbudget) {
                    console.log("Added budget:", addedbudget);
                    dispatch(setData(addedbudget));
                    reset();
                    setOpen(false)
                }
            }
            reset()
            setLoader(false);
        } catch (error) {
            setLoader(false);
            reset()

            console.error("Error adding budget:", error);

        }

    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>

            <Button
                className="px-4 py-2 text-sm font-semibold cursor-pointer"
                onClick={() => setOpen(true)}
            >
                Add Budget
            </Button>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                        <DialogTitle>
                            {"Add Budget"}
                        </DialogTitle>
                        <DialogDescription>
                            {"Your Budget will expire on the last date of the month."}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-3">
                            <Label htmlFor="budgetAmount">Your Budget</Label>
                            <Input
                                id="budgetAmount"
                                type="number"
                                min="0"
                                step="0.01"
                                {...register("budgetAmount", { required: true, maxLength: 6 })}
                                placeholder="Enter amount"
                                required
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="budgetName">Name</Label>
                            <Input
                                id="budgetName"
                                type="text"
                                {...register("budgetName", { required: true })}
                                placeholder="Where did you spend?"
                                required
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
                                Add
                            </Button>
                        )}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}