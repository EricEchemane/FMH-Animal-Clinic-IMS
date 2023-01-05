import { forwardRef } from 'react';
import { Group, Text, Select } from '@mantine/core';
import { ClinicServicesArray } from '~/entities-interfaces/schedule.entity';
import { ClinicService } from '~/entities-interfaces/service.entity';

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
	label: string;
	description: string;
}

// eslint-disable-next-line react/display-name
const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
	({ label, description, ...others }: ItemProps, ref) => (
		<div
			ref={ref}
			{...others}
		>
			<Group noWrap>
				<div>
					<Text size='lg'>{label}</Text>
				</div>
			</Group>
		</div>
	)
);

type Props = {
	value: string | null;
	onChange: (value: string | null) => void;
	services: ClinicService[];
};

export default function ServiceSelect({ onChange, value, services }: Props) {
	const data = services.map((service) => ({
		value: service.name,
		label: service.name,
	}));
	return (
		<Select
			required
			value={value}
			onChange={onChange}
			size='lg'
			label='Service you want to avail'
			placeholder='Pick one'
			itemComponent={SelectItem}
			data={data}
			searchable
			creatable
			nothingFound='That service is not available yet'
			filter={(value, item) =>
				item.label?.toLowerCase().includes(value.toLowerCase().trim()) || false
			}
		/>
	);
}
