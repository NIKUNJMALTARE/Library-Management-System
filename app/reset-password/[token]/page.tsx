import ResetPasswordForm from '@/components/Resetpassword'

export default function ResetPasswordPage({
  params,
}: {
  params: { token: string }
}) {
  return (
    <div className="container mx-auto max-w-md py-12">
      <h1 className="text-2xl font-bold mb-6 text-center">Reset Your Password</h1>
      <ResetPasswordForm token={params.token} />
    </div>
  )
}