import { forwardRef } from 'react';
import { Group, Avatar, Text, Select } from '@mantine/core';

const data = [
	{
		image:
			'https://bpanimalhospital.com/wp-content/uploads/shutterstock_1547371985.jpg',
		label: 'Pet Grooming',
		value: 'grooming',
	},
	{
		image:
			'https://petshaven.org.au/wp-content/uploads/2019/09/ft-veterinary-consultation.jpg',
		label: 'Veteranary Consultation',
		value: 'vet_consultation',
	},
];

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
	image: string;
	label: string;
	description: string;
}

// eslint-disable-next-line react/display-name
const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
	({ image, label, description, ...others }: ItemProps, ref) => (
		<div
			ref={ref}
			{...others}
		>
			<Group noWrap>
				<Avatar
					size={'lg'}
					src={image}
					radius={'lg'}
				/>
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
};

export default function ServiceSelect({ onChange, value }: Props) {
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
