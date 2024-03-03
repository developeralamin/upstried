import { Button, Collapse, Input, message } from 'antd';
import clsx from 'clsx';
import React, { ChangeEvent, useState } from 'react';
import InputError from '../../inputError/InputError';
import { SERVER_SCRAPPER_ENDPOINT } from '../../../config/endpoints';
import attachmentHandler from '../../../services/attachmentHandler';
import { axioService, GET } from '../../../services/axiosService';
import styles from './TipsEmbeddablePanel.module.scss';
import { TipsEmbeddablePanelProps } from './TipsEmbeddablePanel.d';

const TipsEmbeddablePanel: React.FC<TipsEmbeddablePanelProps> = (
  props
) => {
  const { Panel } = Collapse;
  const [embeddedLink, setEmbeddedLnik] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onDoneHandler = async () => {
    setError('');
    if (!embeddedLink) {
      setError('Please enter one link before click on done');
      return;
    }
    if (!attachmentHandler.isAcceptedLink(embeddedLink)) {
      setError('You only can enter youtube or vimeo or soundclud link');
      return;
    }
    setLoading(true);
    if (attachmentHandler.isAcceptedLink(embeddedLink)) {
      let link = embeddedLink;
      const isYoutubeLink =
        attachmentHandler.isYoutubeVideoLink(embeddedLink);
      if (isYoutubeLink) {
        const youtubeVideoId =
          attachmentHandler.getYouTubeIdFromLink(embeddedLink);
        link = `https://www.youtube.com/watch?v=${youtubeVideoId}`;
      }
      try {
        const keys = ['og:image'];
        const response = await axioService(GET, SERVER_SCRAPPER_ENDPOINT, {
          url: link,
          keys: JSON.stringify(keys),
        });
        if (!response.data['url']) {
          setLoading(false);
          setError('Please enter a valid link');
          return;
        }
        props.onChange(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        message.error('Not found');
      }
      return;
    }
  };

  return (
    <div
      className={clsx(styles.TipsEmbeddablePanel, 'TipsEmbeddablePanel')}
    >
      <h4 className={styles.Title}>Attach from</h4>
      {error && <InputError errorMessage={error} />}
      <Collapse>
        <Panel header="Youtube / Vimeo link" key="1">
          <Input
            placeholder="eg. youtube/vimeo link"
            onChange={(ev: ChangeEvent<HTMLInputElement>) => setEmbeddedLnik(ev.target.value)}
          />
        </Panel>
        <Panel header="Audio Link" key="2">
          <Input
            placeholder="eg. soundcloud link"
            onChange={(ev: ChangeEvent<HTMLInputElement>) => setEmbeddedLnik(ev.target.value)}
          />
        </Panel>
      </Collapse>
      <div className={styles.Actions}>
        <Button onClick={() => props.onCancel()}>Cancel</Button>
        <Button
          loading={loading}
          className={styles.BtnDone}
          onClick={onDoneHandler}
          type="primary"
        >
          Done
        </Button>
      </div>
    </div>
  );
};

export default TipsEmbeddablePanel;
