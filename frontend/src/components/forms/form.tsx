import { cn } from '@/lib/utils';

function Form({ className, ...props }: React.ComponentProps<'form'>) {
  return (
    <form
      data-slot="form"
      className={cn('flex flex-col space-y-4', className)}
      {...props}
    />
  );
}

export { Form };
