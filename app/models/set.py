from .db import db, environment, SCHEMA, add_prefix_for_prod

class Set(db.Model):
    __tablename__ = 'Sets'

    if environment == "production":
        __table_args__ = {'schema':SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    folder_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("Folders.id")))
    title = db.Column(db.String(50), nullable = False)
    description = db.Column(db.String(2000), nullable = False)

    #Relationship attributes
    user = db.relationship("User", backref=db.backref("sets", lazy=True))
    folder = db.relationship("Folder", backref=db.backref("sets", lazy=True))


    def to_dict(self):
        return {
            "id":self.id,
            "user_id":self.user_id,
            "folder_id":self.folder_id,
            "title":self.title,
            "description":self.description,          
        }