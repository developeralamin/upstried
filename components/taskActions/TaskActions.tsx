import {
  faEllipsisV,
  faPencilAlt,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Dropdown, Menu, Tooltip } from 'antd';
import React from 'react';

export interface TaskActionsProps {
  onEditClick: any;
  onDeleteClick: any;
}

const TaskActions: React.FC<TaskActionsProps> = (props) => {
  return (
    <>
      <Tooltip title="Edit" placement="bottom">
        <div onClick={() => props.onEditClick()} className="edit-oepner">
          <FontAwesomeIcon icon={faPencilAlt} />
        </div>
      </Tooltip>
      <Dropdown
        trigger={['click']}
        overlay={
          <Menu>
            <Menu.Item style={{ padding: '0' }}>
              <Button
                style={{
                  border: 'none',
                  display: 'block',
                  height: '40px',
                  backgroundColor: 'transparent',
                }}
                onClick={() => props.onDeleteClick()}
              >
                <FontAwesomeIcon
                  style={{ marginRight: '10px' }}
                  icon={faTrash}
                />
                Delete
              </Button>
            </Menu.Item>
            <Menu.Item style={{ padding: '0' }}>
              <Button
                style={{
                  border: 'none',
                  display: 'block',
                  height: '40px',
                  backgroundColor: 'transparent',
                }}
                onClick={() => props.onEditClick()}
              >
                <FontAwesomeIcon
                  style={{ marginRight: '10px' }}
                  icon={faPencilAlt}
                />
                Edit
              </Button>
            </Menu.Item>
          </Menu>
        }
        placement="bottomLeft"
      >
        <Button>
          <FontAwesomeIcon icon={faEllipsisV} />
        </Button>
      </Dropdown>
    </>
  );
};

export default TaskActions;
