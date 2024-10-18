import styles from './app.module.css';
import data from './data.json';
import { useState } from 'react';

export const App = () => {
	const [steps] = useState(data);
	const [formState, setFormState] = useState({
		activeIndex: 0,
		instruction: steps[0].content,
	});
	
	const isFirstStep = formState.activeIndex === 0; // флаг блокировки кнопки "Назад"
	const isLastStep = formState.activeIndex === steps.length - 1; // флаг конец массива для появления кнопки "Начать сначала"
	// событие кнопки "Назад"
	const buttonBack = () => {
		if (!isFirstStep) {
			setFormState({
				activeIndex: formState.activeIndex - 1,
				instruction: steps[formState.activeIndex - 1].content,
			});
		}
	};

	// событие кнопки "Далее"
	const buttonForward = () => {
		if (!isLastStep) {
			setFormState({
				activeIndex: formState.activeIndex + 1,
				instruction: steps[formState.activeIndex + 1].content,
			});
		} else {
			// если находимся в конце массива, сбрасываем состояние на начальные
			setFormState({
				activeIndex: 0,
				instruction: steps[0].content,
			});
		}
	};

	// событие кнопок с цифрами
	const buttomClick = (index) => {
		setFormState({
			activeIndex: index,
			instruction: steps[index].content,
		});
	};

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>{formState.instruction}</div>
					<ul className={styles['steps-list']}>
						{steps.map((item, index) => (
							<li
								key={item.id}
								className={
									styles['steps-item'] +
									' ' +
									(formState.activeIndex > index ? styles.done : '') +
									' ' +
									(formState.activeIndex === index ? styles.active : '')
								}
							>
								<button
									className={styles['steps-item-button']}
									onClick={() => buttomClick(index)}
								>
									{`${index + 1}`}
								</button>
								{item.title}
							</li>
						))}
					</ul>
					<div className={styles['buttons-container']}>
						<button
							className={styles.button}
							onClick={buttonBack}
							disabled={isFirstStep}
						>
							Назад
						</button>
						<button className={styles.button} onClick={buttonForward}>
							{isLastStep ? 'Начать сначала' : 'Далее'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
