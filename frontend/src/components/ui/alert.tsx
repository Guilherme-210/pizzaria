import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { CheckCircle2Icon, CircleXIcon, AlertTriangleIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "group/alert relative grid w-full gap-0.5 rounded-lg border px-2.5 py-2 text-left text-sm has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive:
          "bg-card text-destructive *:data-[slot=alert-description]:text-destructive/90 *:[svg]:text-current",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "font-medium group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-sm text-balance text-muted-foreground md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
        className
      )}
      {...props}
    />
  )
}

function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-action"
      className={cn("absolute top-2 right-2", className)}
      {...props}
    />
  )
}


function AlertSuccess({ title, description }: { title?: string, description?: string }) {
  return (
    <div className="absolute top-5 w-full max-w-md">
      <Alert className=" inset-x-0 top-0 w-full max-w-md border-emerald-200 ">
        <CheckCircle2Icon />
        <AlertTitle>{title || "Sucesso"}</AlertTitle>
        <AlertDescription>
          {description || "Operação realizada com sucesso."}
        </AlertDescription>
      </Alert>
    </div>
  )
}

function AlertInfo({ title, description }: { title?: string, description?: string }) {
  return (
    <div className="absolute top-5 w-full max-w-md">
      <Alert className=" inset-x-0 top-0 w-full max-w-md border-amber-200 bg-amber-500 text-black ">
        <AlertTriangleIcon />
        <AlertTitle>{title || "Alerta"}</AlertTitle>
        <AlertDescription className="text-black">
          {description || "Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente."}
        </AlertDescription>
      </Alert>
    </div>
  )
}

function AlertError({ title, description }: { title?: string, description?: string }) {
  return (
    <div className="absolute top-5 w-full max-w-md">
      <Alert className=" inset-x-0 top-0 w-full max-w-md" variant="destructive">
        <CircleXIcon />
        <AlertTitle>{title || "Error"}</AlertTitle>
        <AlertDescription>
          {description || "ocorreu um erro ao processar sua solicitação. Por favor, tente novamente."}
        </AlertDescription>
      </Alert>
    </div>
  )
}

function BoxAlert({ title, description, type }: { title?: string, description?: string, type: 'success' | 'info' | 'error' }) {
  return (
    <div className="z-50 absolute top-0 left-0 w-full flex items-center justify-center">
      {type === 'success' && (
        <AlertSuccess title={title} description={description} />
      )}
      {type === 'info' && (
        <AlertInfo title={title} description={description} />
      )}
      {type === 'error' && (
        <AlertError title={title} description={description} />
      )}
    </div>
  )
}

export { Alert, AlertTitle, AlertDescription, AlertAction, AlertError, AlertInfo, AlertSuccess, BoxAlert }


