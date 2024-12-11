import { useQueryClient } from 'react-query';

interface UseQueryInvalidator {
	invalidate: (value: string | string[]) => void;
}

const useQueryInvalidator = (): UseQueryInvalidator => {
	const queryClient = useQueryClient();

	function invalidate(value: string | string[]): void {
		queryClient.invalidateQueries(value);
	}

	return { invalidate };
};

export default useQueryInvalidator;
