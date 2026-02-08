type Props = {
  children?: React.ReactNode;
};

export function Main({ children }: Props) {
  return (
    <main className="w-full h-auto px-4 py-8">
      <div className="mx-auto w-full h-auto max-w-7xl flex flex-col gap-4">
        {children}
      </div>
    </main>
  );
}
