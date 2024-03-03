import { render, screen } from '@testing-library/react'
import TipsList from './../TipsList'
import data, { tipsObj } from '../mock/tips.mock';
import TipsListItem from '../../tipsListItem/TipsListItem';
import TipsMeta from '../../tipsListItem/tipsMeta/TipsMeta';
const { tips, meta } = data;

describe('TipsList', () => {
    it('renders tips list heading correctly and length is 15', () => {
        render(<TipsList tips={tips} meta={meta} />)
        const tipsList = screen.getAllByTestId('tips-list-item');
        expect(tipsList).toHaveLength(15);
    })

    it('renders tips list title correctly', () => {
        render(<TipsListItem tips={tipsObj} />)
        const heading = screen.getByTestId('tipsListItem_title').textContent;
        expect(heading).toBe("How To Learn Anything Faster - ...");
    })

    it('renders tips meta correctly', () => {
        render(<TipsMeta
            author={tipsObj.author}
            category={tipsObj.category}
            categoryUrl={tipsObj.categoryUrl}
        />)
        expect(screen.getByTestId("tips-author").textContent).toBe("by Practical Psychology");
        expect(screen.getByTestId("tips-category").textContent).toBe("Self-Development");
        if (tipsObj.publishedAt) {
            expect(screen.getByTestId("tips-date").textContent).toBe("2020-06-01");
        }
    });

    it('renders my tips properly', () => {
        render(<TipsList tips={tips} meta={meta} />)
        const tipsList = screen.getAllByTestId('tips-list-item');
        expect(tipsList).toHaveLength(15);
    })

})