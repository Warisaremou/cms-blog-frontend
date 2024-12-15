export default function InputError({ errorMessage }: { errorMessage: string | undefined }) {
  return <span className="mt-1 text-destructive text-xs font-bh-medium">{errorMessage}</span>;
}
