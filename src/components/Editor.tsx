"use client";
import TextareaAutosize from "react-textarea-autosize";
import { useForm } from "react-hook-form";
import { PostType, PostValidator } from "@/lib/validators/posts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useRef } from "react";
import type EditorJS from "@editorjs/editorjs";

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

    const onSubmit = (data: any) => {
        console.log(data);
    };

    const ref = useRef<EditorJS>();
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
                },
            });
        }
    }, []);

    return (
        <div className="w-full p-4 bg-zinc-50 rounded-lg border border-zinc-200">
            <form
                id="community-post-form"
                className="w-fit"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="prose prose-stone dark:prose-invert">
                    <TextareaAutosize
                        placeholder="title"
                        className="w-full resize-none appearance-none overflow-hidden bg-transparent text-3xl font-bold focus:outline-none"
                    />
                </div>
            </form>
        </div>
    );
};

export default Editor;
