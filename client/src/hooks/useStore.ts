import { useEffect, useState } from 'react';

// 读写缓存
export function useStore<T>(key: string, initialValue: T | (() => T)) {
	const [value, setValue] = useState<T>(() => {
		// try {
			const jsonValue = localStorage.getItem(key);
			if (jsonValue != null) return JSON.parse(jsonValue);

			if (typeof initialValue === 'function') {
				return (initialValue as () => T)();
			} else {
				return initialValue;
			}
		// } catch (error) {
		// 	console.error(error)
		// }
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

	return [value, setValue] as [typeof value, typeof setValue];
}

