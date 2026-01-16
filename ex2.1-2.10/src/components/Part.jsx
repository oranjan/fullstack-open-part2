function Part(props) {
  const { part, exercise } = props;
  return (
    <p>
      {part} {exercise}
    </p>
  );
}

export default Part;
