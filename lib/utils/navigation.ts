import { useRouter } from "next/navigation";

export function useNavigation() {
  const router = useRouter();

  const navigate = (path: string) => {
    router.push(path);
  };

  const goBack = () => {
    router.back();
  };

  return {
    navigate,
    goBack,
  };
} 