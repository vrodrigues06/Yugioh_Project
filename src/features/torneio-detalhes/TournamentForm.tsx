// import Select from "../../components/Select";
// import PersonagemFormList from "../personagens-detalhes/PersonagemFormList";
// import Button from "../../components/Button";
// import Loading from "../../components/Loading";
// import LoadingMini from "../../components/LoadingMini";
// import { TournamentFormModel } from "./TournamentForm.model";
// import { motion } from "framer-motion";

// const TournamentForm = () => {
//   const {
//     register,
//     errors,
//     handleSubmit,
//     onSubmit,
//     personagens,
//     isLoading,
//     isCreating,
//     handleClassificacaoChange,
//     classificacoesSelecionadas,
//     anos,
//     nomeInput,
//     geracoes,
//   } = TournamentFormModel();

//   return (
//     <form className=" bg-azul-950" onSubmit={handleSubmit(onSubmit)}>
//       <div className="mb-2 text-md xs:text-lg text-orange-500 font-semibold ">
//         <h3 className="text-slate-500 text-sm">Torneio</h3>
//         <motion.span
//           key={nomeInput}
//           initial={{ y: -50, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.6, ease: "easeOut" }}
//         >
//           {nomeInput}
//         </motion.span>
//       </div>

//       <div className="flex mb-4 gap-4 border-t border-sky-900 pt-4">
//         <Select
//           options={geracoes}
//           label="Geração"
//           id="geracao"
//           register={register}
//           errors={errors}
//           errorMessage="Selecione antes de continuar"
//         />
//         <Select
//           options={anos}
//           label="Ano"
//           id="ano"
//           register={register}
//           errors={errors}
//           errorMessage="Selecione antes de continuar"
//         />
//       </div>

//       <input type="hidden" {...register("nome")} readOnly />

//       <div className="h-96 border-t border-sky-900 pt-4 pr-4 sm:pr-0 overflow-y-auto mb-6 ">
//         <h3 className="text-slate-500 text-sm mb-4">Lista de Duelistas</h3>

//         {isLoading ? (
//           <LoadingMini />
//         ) : (
//           <PersonagemFormList
//             personagens={personagens}
//             handleClassificacaoChange={handleClassificacaoChange}
//             classificacoesSelecionadas={classificacoesSelecionadas}
//           />
//         )}
//       </div>

//       <Button disabled={isCreating}>
//         {isCreating ? <LoadingMini /> : "Criar Torneio"}
//       </Button>
//     </form>
//   );
// };

// export default TournamentForm;

// // TODO
// // import React from "react";
// // import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
// // import {
// //   Classificacao,
// //   Geracao,
// //   Podium,
// //   RankingPontuacao,
// //   SistemaPontuacao,
// //   TorneioInput,
// // } from "../@types";
// // import Select from "./Select";
// // import Input from "./Input";
// // import { setAnos } from "../utils/setAnos";
// // import { addRanking, getPersonagens } from "../api/apiPersonagens";
// // import { Personagem } from "../@types/personagem";
// // import PersonagemList from "./PersonagemList";
// // import usePersonagens from "../hooks/usePersonagens";
// // import Loading from "./Loading";
// // import useClassificacao from "../hooks/useClassificacao";
// // import Button from "./Button";
// // import setPodium from "../utils/setPodium";
// // import LoadingMini from "./LoadingMini";
// // import useCreateTorneio from "../hooks/useCreateTorneio";

// // const geracoes: Geracao[] = ["dm", "gx", "5ds", "zexal", "arc-v", "vrains"];
// // const anos = setAnos(2002);

// // export interface TorneioProps {
// //   geracao: Geracao;
// //   sistema_pontuacao: SistemaPontuacao;
// //   classificacao: Classificacao;
// //   ranking: RankingPontuacao[];
// //   podium: Podium[];
// // }

// // const TournamentForm = () => {
// //   const {
// //     classificacao,
// //     handleClassificacaoChange,
// //     ranking,
// //     setClassificacoes,
// //     setRanking,
// //   } = useClassificacao();

// //   const { isCreating, mutate: createTorneio } = useCreateTorneio();

// //   const {
// //     register,
// //     formState: { errors },
// //     handleSubmit,
// //     watch,
// //     reset,
// //     setValue,
// //   } = useForm<TorneioInput | FieldValues>();

// //   const onSubmit = (data: TorneioInput | FieldValues) => {
// //     if (personagens === undefined) return;
// //     data.classificacao = classificacao;
// //     data.ranking = ranking;
// //     data.podium = setPodium(classificacao);

// //     personagens.forEach(({ nome, id, pontuacao }) => {
// //       const personagemPontuacao = data.ranking.find(
// //         ({ nome: n }: RankingPontuacao) => n === nome,
// //       );

// //       const pontuacaoAtual = personagemPontuacao.pontos + pontuacao;

// //       const colocacao = {
// //         ano: data.ano,
// //         classificacao: data.classificacao.find((obj: Classificacao) => {
// //           if (Object.entries(obj)[0][0] === nome) {
// //             return true;
// //           } else return false;
// //         })[nome],
// //       };

// //       addRanking(colocacao, pontuacaoAtual, id);
// //     });

// //     createTorneio(data, {
// //       onSettled: () => {
// //         reset({
// //           geracao: "",
// //           ano: "",
// //           nome: "",
// //         });
// //         setClassificacoes([]);
// //         setRanking([]);
// //         data.podium = [];
// //       },
// //     });
// //   };

// //   const geracaoInput = watch("geracao");
// //   const anoInput = watch("ano");

// //   React.useEffect(() => {
// //     if (geracaoInput && anoInput) {
// //       setValue("nome", `${geracaoInput.toUpperCase()} ${anoInput}`);
// //     }
// //   }, [geracaoInput, anoInput, setValue]);

// //   const { data: personagens, isLoading } = usePersonagens(geracaoInput);

// //   return (
// //     <form
// //       className="grid gap-8 justify-start bg-purple-900 px-8 py-4 rounded-sm"
// //       onSubmit={handleSubmit(onSubmit)}
// //     >
// //       <div className="flex gap-8">
// //         <Select
// //           className="bg-purple-600 py-1 text-purple-900 rounded-md"
// //           options={geracoes}
// //           label="Geração"
// //           id="geracao"
// //           register={register}
// //           errors={errors}
// //           errorMessage="Defina uma geração antes de continuar"
// //         />
// //         <Select
// //           options={anos}
// //           label="Ano"
// //           id="ano"
// //           register={register}
// //           errors={errors}
// //           errorMessage="Defina um ano antes de continuar"
// //           className="bg-purple-600 p-1 rounded-md"
// //         />
// //       </div>
// //       <div className="flex items-center gap-2">
// //         <label className="font-bold text-purple-600" htmlFor="nome">
// //           Nome
// //         </label>
// //         <input
// //           className="bg-purple-600 p-1 rounded-md"
// //           {...register("nome")}
// //           readOnly
// //         />
// //       </div>
// //       {isLoading ? (
// //         <Loading />
// //       ) : (
// //         <PersonagemList
// //           personagens={personagens}
// //           handleClassificacaoChange={handleClassificacaoChange}
// //         />
// //       )}
// //       <Button>{isCreating ? <LoadingMini /> : ""}Criar Torneio</Button>
// //     </form>
// //   );
// // };

// // export default TournamentForm;
