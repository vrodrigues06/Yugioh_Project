// import { useEffect } from "react";
// import { FieldValues, useForm } from "react-hook-form";
// import { Mundial, Ranking, RankingPontuacao, TorneioInput } from "../../@types";
// import { Personagem } from "../../@types/personagem";
// import { addRankingMundial } from "../../api/apiPersonagens";
// import { createRanking, updateRankingGlobal } from "../../api/apiRanking";
// import useAllPersonagens from "../../hooks/useAllPersonagens";
// import useClassificacao from "../../hooks/useClassificacao";
// import useCreateMundial from "../../hooks/useCreateMundial";
// import { setAnos } from "../../utils/setAnos";
// import setPodium from "../../utils/setPodium";
// import { useNavigate } from "react-router";

// const podemParticipar = ["Campeao", "Segundo", "Terceiro", "Quarto"];
// const anos = setAnos(2005);

// export const useMundialFormModel = () => {
//   const {
//     classificacao,
//     handleClassificacaoChange,
//     classificacoesSelecionadas,
//     setClassificacoes,
//     setClassificacoesSelecionadas,
//   } = useClassificacao();

//   const { isCreating, mutate: createMundial } = useCreateMundial();
//   const navigate = useNavigate();

//   const {
//     register,
//     formState: { errors },
//     handleSubmit,
//     watch,
//     reset,
//     setValue,
//   } = useForm<Mundial | FieldValues>();

//   const anoInput = watch("ano");

//   useEffect(() => {
//     if (anoInput) {
//       setValue("nome", `Mundial ${anoInput}`);
//     }
//   }, [anoInput, setValue]);

//   const { data: personagens, isLoading } = useAllPersonagens();

//   const personagensFiltered: Personagem[] =
//     personagens?.filter((personagem) =>
//       personagem.colocacoes.some(
//         (p) => p.ano === anoInput && podemParticipar.includes(p.classificacao),
//       ),
//     ) || [];

//   const onSubmit = async (data: TorneioInput | FieldValues) => {
//     if (!personagensFiltered.length) return;

//     const rankingAtual: Ranking = {
//       ano: Number(anoInput),
//       geracao: "mundial",
//       ranking: classificacao.map(({ nome, pontos }) => ({ nome, pontos })),
//     };

//     data.classificacao = classificacao;
//     updateRankingGlobal("mundial", classificacao);
//     await createRanking(rankingAtual);
//     data.podium = setPodium(classificacao);

//     personagensFiltered.forEach(
//       ({ nome, id, participacoes_mundial, pontuacao_mundial }) => {
//         const personagemPontuacao = data.classificacao.find(
//           ({ nome: n }: RankingPontuacao) => n === nome,
//         );

//         if (personagemPontuacao) {
//           const pontuacaoAtual = personagemPontuacao.pontos + pontuacao_mundial;
//           const participacaoInc = participacoes_mundial + 1;

//           const colocacao = {
//             ano: data.ano,
//             classificacao: personagemPontuacao.classificacao,
//           };
//           addRankingMundial(colocacao, participacaoInc, pontuacaoAtual, id);
//         }
//       },
//     );

//     createMundial(data, {
//       onSuccess: () => {
//         navigate(`/mundial/${anoInput}`);
//         reset();
//         setClassificacoes([]);
//         setClassificacoesSelecionadas({});
//       },
//     });
//   };

//   return {
//     register,
//     errors,
//     handleSubmit,
//     onSubmit,
//     anoInput,
//     personagensFiltered,
//     isLoading,
//     handleClassificacaoChange,
//     classificacoesSelecionadas,
//     isCreating,
//     anos,
//   };
// };
