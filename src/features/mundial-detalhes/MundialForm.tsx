// import { motion } from "framer-motion";
// import Button from "../../components/Button";
// import Loading from "../../components/Loading";
// import LoadingMini from "../../components/LoadingMini";
// import Select from "../../components/Select";
// import PersonagemList from "../personagens-detalhes/PersonagemFormList";

// const MundialForm = () => {
//   const {
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
//   } = useMundialFormModel();

//   return (
//     <form className=" bg-azul-950" onSubmit={handleSubmit(onSubmit)}>
//       <div className="mb-2 text-md xs:text-lg text-orange-500 font-semibold ">
//         <h3 className="text-slate-500 text-sm">Mundial</h3>
//         <motion.span
//           key={anoInput}
//           initial={{ y: -50, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.6, ease: "easeOut" }}
//         >
//           {anoInput}
//         </motion.span>
//       </div>
//       <div className="flex mb-4 gap-4 border-t border-sky-900 pt-4">
//         <Select
//           options={anos}
//           label="Ano"
//           id="ano"
//           register={register}
//           errors={errors}
//           errorMessage="Defina um ano antes de continuar"
//         />
//       </div>

//       <input
//         type="hidden"
//         {...register("nome")}
//         value={`Mundial ${anoInput}`}
//         readOnly
//       />

//       <div className="h-96 border-t border-sky-900 pt-4 pr-4 sm:pr-0 overflow-y-auto mb-6 ">
//         <h3 className="text-slate-500 text-sm mb-4">Lista de Duelistas</h3>

//         {isLoading ? (
//           <LoadingMini />
//         ) : (
//           <PersonagemList
//             personagens={personagensFiltered}
//             handleClassificacaoChange={handleClassificacaoChange}
//             classificacoesSelecionadas={classificacoesSelecionadas}
//           />
//         )}
//       </div>
//       <Button disabled={isCreating}>
//         {isCreating ? <LoadingMini /> : ""}Criar Torneio
//       </Button>
//     </form>
//   );
// };

// export default MundialForm;
