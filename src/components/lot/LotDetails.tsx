"use client";

import Image from "next/image";
import {FormEvent, ReactNode, useState} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import TestBids2 from "@/components/bids/TestBids2";
import {useUser} from "@/contexts/UserContext";
import {AuctionLot} from "@prisma/client";

interface LotDetailsProps {
    auctionLot: AuctionLot;
    children?: ReactNode;
}

export default function LotDetails(props: LotDetailsProps) {
    const {auctionLot, children} = props;
    const {id, naming, objectClassifier, lotStatus, lotLogoUrl, startPrice} = auctionLot;
    const [bidAmount, setBidAmount] = useState<string>("");
    const {selectedUser} = useUser();

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const response = await fetch(`/api/bids?lotId=${id}&username=${selectedUser}&bidAmount=${bidAmount}`, {
                method: "POST",
                cache: "no-store",
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error submitting bid:', error);
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="cursor-pointer">{children}</div>
            </DialogTrigger>
            <DialogContent className="max-w-sm">
                <DialogHeader>
                    <DialogTitle className="flex space-x-3 items-center justify-center">
                        <h4>Деталі лоту</h4>
                        <p className={`border px-2 rounded py-1 bg-muted text-muted-foreground text-sm font-medium ${lotStatus}`}>
                            {lotStatus === "ACTIVE" ? "Активний" : lotStatus === "SOLD" ? "Продано" : "Відмінено"}
                        </p>
                    </DialogTitle>
                    <DialogDescription className="flex w-full items-center space-x-3">
                        <Image src={lotLogoUrl} width={200} height={200} alt="Lot Logo"
                               className="bg-slate-50 rounded-md"/>
                        <p className="border px-2 rounded py-1 bg-muted text-muted-foreground text-base font-semibold">
                            Категорія: {objectClassifier}
                        </p>
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-2">
                    <div><Label className="w-full">Назва: {naming}</Label></div>
                    <div><Label className="w-full">Стартова ціна: {startPrice}</Label></div>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full">Зробити ставку</Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <form onSubmit={handleSubmit}>
                                <Input placeholder="Ваша ціна" type="number" value={bidAmount}
                                       onChange={e => setBidAmount(e.target.value)}/>
                                <Button type="submit" variant="outline" className="w-full">Поставити</Button>
                            </form>
                        </PopoverContent>
                    </Popover>
                </div>
                <TestBids2 id={id}/>
            </DialogContent>
        </Dialog>
    );
}
