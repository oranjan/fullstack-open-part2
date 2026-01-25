export default function Total(props) {
  const { parts } = props;
  const sum = parts.reduce((acc, curr) => acc + curr.exercises, 0);
  return <h4>Total of {sum} exercises </h4>;
}
