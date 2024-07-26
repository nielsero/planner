import { Link2, Tag, X } from "lucide-react";
import { Button } from "../../components/button";
import { FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLink } from "../../api/create-link";
import { useParams } from "react-router-dom";
import { Spinner } from "../../components/spinner";
import { z } from "zod";

type CreateLinkModalProps = {
  closeCreateLinkModal: () => void;
};

const createLinkSchema = z.object({
  title: z.string().min(3),
  url: z.string().url(),
});

export function CreateLinkModal({
  closeCreateLinkModal,
}: CreateLinkModalProps) {
  const { tripId } = useParams() as { tripId: string };

  const queryClient = useQueryClient();

  const { mutateAsync: createLinkFn, isPending: isCreatingLink } = useMutation({
    mutationFn: createLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links", tripId] });
    },
  });

  async function handleCreateLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const title = formData.get("title");
    const url = formData.get("url");

    try {
      const link = createLinkSchema.parse({ title, url });

      await createLinkFn({
        tripId,
        title: link.title,
        url: link.url,
      });

      closeCreateLinkModal();
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error(error.flatten().fieldErrors);
      }
      return;
    }

    console.log({ title, url });
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Cadastrar link</h2>
            <button>
              <X
                className="size-5 text-zinc-400"
                onClick={closeCreateLinkModal}
              />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Todos convidados podem visualizar os links importantes.
          </p>
        </div>

        <form onSubmit={handleCreateLink} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Tag className="size-5 text-zinc-400" />
            <input
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              type="text"
              name="title"
              placeholder="Titulo do link"
            />
          </div>

          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Link2 className="size-5 text-zinc-400" />
            <input
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              type="url"
              name="url"
              placeholder="URL"
            />
          </div>

          <Button
            type="submit"
            className="w-full h-11"
            disabled={isCreatingLink}
          >
            {isCreatingLink ? <Spinner /> : "Salvar link"}
          </Button>
        </form>
      </div>
    </div>
  );
}
