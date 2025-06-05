import React from "react";
import { useParams } from "react-router";

const PersonagensGeracaoModel = () => {
  const { geracao } = useParams();

  return { geracao };
};

export default PersonagensGeracaoModel;
