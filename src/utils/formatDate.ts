const formatDate = (date: string): string => {
  return Intl.DateTimeFormat('pt-BR').format(new Date(date));
};

export default formatDate;
