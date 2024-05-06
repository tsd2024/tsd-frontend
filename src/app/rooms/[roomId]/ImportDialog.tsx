"use client"

import React, { useState } from 'react';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { CiImport } from "react-icons/ci";

import { 
    Form, 
    FormField, 
    FormMessage, 
    FormItem, 
    FormControl 
} from "@/components/ui/form";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


const formSchema = z.object({
    file: typeof window === 'undefined' ? z.any() : z.instanceof(FileList).refine((file) => file?.length == 1, 'File is required.')
});

interface ImportDialogProps {
    roomId: string;
}

function ImportDialog(props: ImportDialogProps) {
    const BACKEND_URL = process.env.BACKEND_URL;
    const BACKEND_PROTOCOL = process.env.BACKEND_PROTOCOL;
    const [isImportDialogOpen, setisImportDialogOpen] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const fileRef = form.register("file");

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setisImportDialogOpen(false);

        const formData = new FormData();
        formData.append('file', values.file[0]);

        const response = await fetch(`${BACKEND_PROTOCOL}://${BACKEND_URL}/api/v1/uploadcsv?lobby_key=${props.roomId}`, {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            await response.json();
        }

    }

    return (
        <Dialog open={isImportDialogOpen} onOpenChange={setisImportDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <CiImport />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Import from Jira CSV</DialogTitle>
                    <DialogDescription>
                        Attach CSV file with your user stories from Jira
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form id="import-form" onSubmit={form.handleSubmit(onSubmit)} className="flex flex-row space-x-2 items-center justify-center">
                        <FormField
                            control={form.control}
                            name="file"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormControl>
                                            <Input type="file" placeholder="shadcn" {...fileRef} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />
                    </form>
                </Form>

                <DialogFooter>
                    <Button type="submit" form="import-form">Import</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ImportDialog;
