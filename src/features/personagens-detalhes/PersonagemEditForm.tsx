import React from "react";
import { Personagem, PersonagemProps } from "../../@types/personagem";
import FileInput from "../../components/FileInput";
import Perfil from "../../components/Perfil";
import { FieldValues, useForm, UseFormRegister } from "react-hook-form";
import Input from "../../components/Input";
import useEditPersonagem from "../../hooks/useEditPersonagem";
import LoadingMini from "../../components/LoadingMini";
import { uploadImagemPerfil } from "../../api/apiPersonagens";

type PersonagemEditFormProps = {
  personagem: Personagem;
};

type FormData = {
  nome: string;
  deckName: string;
  perfil?: FileList;
};

const PersonagemEditForm = ({ personagem }: PersonagemEditFormProps) => {
  const { mutate, isEditing } = useEditPersonagem();
  const {
    register,
    handleSubmit,
    clearErrors,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      nome: personagem.nome,
      deckName: personagem.deckName,
    },
  });

  async function onSubmit(data: PersonagemProps | FieldValues) {
    try {
      let perfilUrl = personagem.perfil;

      const imagemFile = data.perfil?.[0];

      if (imagemFile instanceof File) {
        const uploadedUrl = await uploadImagemPerfil(imagemFile, data.nome);

        if (!uploadedUrl) {
          throw new Error("Erro ao fazer upload da imagem.");
        }

        perfilUrl = uploadedUrl;
      }

      const personagemAtualizado = {
        nome: data.nome,
        deckName: data.deckName,
        perfil: perfilUrl,
      };

      mutate(
        { id: personagem.id, personagem: personagemAtualizado },
        {
          onSuccess: () => {
            console.log("Personagem atualizado com sucesso");
          },
        },
      );
    } catch (err) {
      console.error("Erro ao editar personagem:", err);
    }
  }

  return (
    <form className=" bg-azul-950" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-4 items-center text-white font-bold text-lg">
        <Perfil size="16" personagem={personagem} />
        <h3>
          {personagem.nome} ({personagem.geracao.toUpperCase()})
        </h3>
      </div>
      <div className="grid sm:grid-cols-2 gap-2 gap-y-6 border-t border-sky-900 pt-4 items-center sm:w-md mb-4 mt-4">
        <Input
          label="Nome"
          register={register as unknown as UseFormRegister<FieldValues>}
          id="nome"
          errors={errors}
          errorMessage="Selecione um nome"
        />
        <Input
          label="Deck"
          register={register as unknown as UseFormRegister<FieldValues>}
          id="deckName"
          errors={errors}
          errorMessage="Selecione o Deck"
        />
        <FileInput
          register={register}
          name="perfil"
          errors={errors}
          clearErrors={clearErrors}
          setValue={setValue}
        />
        <button
          type="submit"
          disabled={isEditing}
          className="bg-azul-800 cursor-pointer text-sky-600 rounded-sm py-1.5 px-2 sm:py-2 sm:px-3 sm:col-start-1 justify-self-start transition-colors hover:bg-azul-900 hover:text-sky-400"
        >
          {isEditing ? <LoadingMini /> : "Editar Duelista"}
        </button>
      </div>
    </form>
  );
};

export default PersonagemEditForm;
