import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Geracao } from "../../@types";
import { PersonagemProps } from "../../@types/personagem";
import { uploadImagemPerfil } from "../../api/apiPersonagens";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Select from "../../components/Select";
import useCreatePersonagem from "../../hooks/useCreatePersonagem";
import FileInput from "../../components/FileInput";
import { useParams } from "react-router";
import LoadingMini from "../../components/LoadingMini";

const geracoes: Geracao[] = ["dm", "gx", "5ds", "zexal", "arc-v", "vrains"];

const PersonagemForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm();

  const { geracao } = useParams();
  const { isCreating, mutate: createPersonagem } = useCreatePersonagem();

  async function onSubmit(data: PersonagemProps | FieldValues) {
    const imagemFile = data.perfil[0];

    if (!imagemFile) {
      toast.error("Selecione uma imagem de perfil para continuar.");
      return;
    }

    const imageUrl = await uploadImagemPerfil(imagemFile, data.nome);
    if (!imageUrl) return;

    const personagemData = { ...data, perfil: imageUrl };

    createPersonagem(personagemData, {
      onSuccess: () => {
        reset();
      },
    });
  }

  return (
    <form className=" bg-azul-950" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="text-slate-500 text-sm mb-2">Duelista</h3>
      <div className="grid sm:grid-cols-2 gap-2 gap-y-6 border-t border-sky-900 pt-4 items-center sm:w-md mb-16">
        <Input
          label="Nome"
          register={register}
          id="nome"
          errors={errors}
          errorMessage="Selecione um nome"
        />

        <Input
          label="Deck"
          register={register}
          id="deckName"
          errors={errors}
          errorMessage="Selecione o Deck"
        />

        <Select
          options={geracoes}
          register={register}
          errors={errors}
          id="geracao"
          label="Geração"
          geracao={geracao}
          errorMessage="Selecione a Geração"
        />
        <FileInput
          register={register}
          name="perfil"
          errors={errors}
          clearErrors={clearErrors}
          setValue={setValue}
        />
      </div>

      <Button disabled={isCreating}>
        {" "}
        {isCreating ? <LoadingMini /> : "Criar Duelista"}
      </Button>
    </form>
  );
};

export default PersonagemForm;
