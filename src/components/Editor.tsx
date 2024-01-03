"use client";
import TextareaAutosize from "react-textarea-autosize";
import { useForm } from "react-hook-form";
import { PostType, PostValidator } from "@/lib/validators/posts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useRef, useState } from "react";
import type EditorJS from "@editorjs/editorjs";
import { uploadFiles } from "@/lib/uploadthing";
import { object } from "zod";
import { toast } from "@/hooks/use-toast";

interface EditorProps {
    communityId: string;
}

const Editor = ({ communityId }: EditorProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PostType>({
        resolver: zodResolver(PostValidator),
        defaultValues: {
            communityId,
            title: " ",
            content: null,
        },
    });

    const _titleRef = useRef<HTMLTextAreaElement>(null);
    const ref = useRef<EditorJS>();
    const [isMounted, setIsMounted] = useState<boolean>(false);

    const initializeEditor = useCallback(async () => {
        const EditorJS = (await import("@editorjs/editorjs")).default;
        const Header = (await import("@editorjs/header")).default;
        const Embed = (await import("@editorjs/embed")).default;
        const Table = (await import("@editorjs/table")).default;
        const List = (await import("@editorjs/list")).default;
        const Code = (await import("@editorjs/code")).default;
        const LinkTool = (await import("@editorjs/link")).default;
        const InlineCode = (await import("@editorjs/inline-code")).default;
        const Image = (await import("@editorjs/image")).default;

        if (!ref.current) {
            const editor = new EditorJS({
                holder: "editor",
                onReady: () => {
                    ref.current = editor;
                },
                placeholder: "Type here to write your post...",
                inlineToolbar: true,
                data: { blocks: [] },
                tools: {
                    header: Header,
                    linkTool: {
                        class: LinkTool,
                        config: {
                            endpoint: "/api/link",
                        },
                    },
                    image: {
                        class: Image,
                        config: {
                            uploader: {
                                async uploadByFile(file: File) {
                                    const [res] = await uploadFiles(
                                        [file],
                                        "imageUploader",
                                    );
                                    return {
                                        success: 1,
                                        file: { url: res.fileUrl },
                                    };
                                },
                            },
                        },
                    },
                    list: List,
                    code: Code,
                    inlineCode: InlineCode,
                    table: Table,
                    embed: Embed,
                },
            });
        }
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setIsMounted(true);
        }
    }, []);

    useEffect(() => {
        if (Object.keys(errors).length) {
            for (const [_key, value] of Object.entries(errors)) {
                toast({
                    title: "something went wrong",
                    description: (value as { message: string }).message,
                    variant: "destructive",
                });
            }
        }
    }, [errors]);

    useEffect(() => {
        const init = async () => {
            await initializeEditor();

            setTimeout(() => {
                _titleRef.current?.focus();
            }, 0);
        };
        if (isMounted) {
            init();
            return () => {
                ref.current?.destroy();
                ref.current = undefined;
            };
        }
    }, [isMounted, initializeEditor]);

    const { ref: titleRef, ...rest } = register("title");

    const onSubmit = (data: PostType) => {
        const blocks = ref.current?.save();

        const payload: PostType = {
            title: data.title,
            content: blocks,
            communityId,
        };
    };

    if (!isMounted) {
        return null;
    }

    return (
        <div className="w-full p-4 bg-zinc-50 rounded-lg border border-zinc-200">
            <form
                id="community-post-form"
                className="w-fit"
                onSubmit={handleSubmit((e) => {})}
            >
                <div className="prose prose-stone dark:prose-invert">
                    <TextareaAutosize
                        ref={(e) => {
                            titleRef(e);
                            //@ts-ignore
                            _titleRef.current = e;
                        }}
                        {...rest}
                        placeholder="title"
                        className="w-full resize-none appearance-none overflow-hidden bg-transparent text-3xl font-bold focus:outline-none"
                    />
                    <div id="editor" className="min-h-[500px] w-full " />
                </div>
            </form>
        </div>
    );
};

export default Editor;
