"""empty message

Revision ID: 77ac64b54e1c
Revises: 8122bba3d2e1
Create Date: 2023-02-27 17:51:00.145409

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '77ac64b54e1c'
down_revision = '8122bba3d2e1'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('reading_list', schema=None) as batch_op:
        batch_op.add_column(sa.Column('comic_img', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('comic_title', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('reading_list', schema=None) as batch_op:
        batch_op.drop_column('comic_title')
        batch_op.drop_column('comic_img')

    # ### end Alembic commands ###