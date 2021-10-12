import { Label } from '@mui/icons-material';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { ICategory } from '../../types';
import Link from '../../configs/mui/Link';

export interface SidebarProps {
  categorylist: ICategory[];
  openSidebar: boolean;
  closeDrawer: () => void;
}

export default function Sidebar({ categorylist, openSidebar, closeDrawer }: SidebarProps) {
  return (
    <Box>
      <List>
        <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>Danh mục</Typography>
        <ListItem component={Link} href="/search">
          <ListItemButton>
            <ListItemIcon>
              <Label />
            </ListItemIcon>
            <ListItemText>Tất cả</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem component={Link} href="/search?-sold">
          <ListItemButton>
            <ListItemIcon>
              <Label />
            </ListItemIcon>
            <ListItemText>Nổi bật</ListItemText>
          </ListItemButton>
        </ListItem>
        {categorylist.map((state, idx) => (
          <ListItem key={idx} component={Link} href={`/search?category=${state._id}`}>
            <ListItemButton>
              <ListItemIcon>
                <Label />
              </ListItemIcon>
              <ListItemText>{state.name}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Drawer anchor="right" open={openSidebar} onClose={closeDrawer}>
        <List>
          <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>Danh mục</Typography>
          <ListItem component={Link} href="/search">
            <ListItemButton>
              <ListItemIcon>
                <Label />
              </ListItemIcon>
              <ListItemText>Tất cả</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem component={Link} href="/search?-sold">
            <ListItemButton>
              <ListItemIcon>
                <Label />
              </ListItemIcon>
              <ListItemText>Nổi bật</ListItemText>
            </ListItemButton>
          </ListItem>
          {categorylist.map((state, idx) => (
            <ListItem key={idx} component={Link} href={`/search?category=${state._id}`}>
              <ListItemButton>
                <ListItemIcon>
                  <Label />
                </ListItemIcon>
                <ListItemText>{state.name}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
